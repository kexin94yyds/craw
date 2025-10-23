import React, { useMemo, useState } from "react";

export interface SourceSelectionValue {
  platform: string;
  url: string;
  tags: string[];
}

export interface PlatformOption {
  label: string;
  value: string;
}

export interface SourceSelectionCardProps {
  value: SourceSelectionValue;
  onChange: (value: SourceSelectionValue) => void;
  platformOptions: PlatformOption[];
  className?: string;
  title?: string;
  description?: string;
}

const defaultValue: SourceSelectionValue = {
  platform: "",
  url: "",
  tags: [],
};

export const SourceSelectionCard: React.FC<SourceSelectionCardProps> = ({
  value,
  onChange,
  platformOptions,
  className,
  title = "选择内容来源",
  description = "配置要收集的内容来源和标签，帮助系统精准定位素材。",
}) => {
  const normalizedValue = useMemo(() => ({
    platform: value?.platform ?? defaultValue.platform,
    url: value?.url ?? defaultValue.url,
    tags: Array.isArray(value?.tags) ? value.tags : defaultValue.tags,
  }), [value]);

  const [tagInput, setTagInput] = useState("");

  const handleChange = (updated: Partial<SourceSelectionValue>) => {
    onChange({
      ...normalizedValue,
      ...updated,
    });
  };

  const addTag = (rawTag: string) => {
    const tag = rawTag.trim();
    if (!tag) {
      return;
    }
    if (normalizedValue.tags.some((existing) => existing.toLowerCase() === tag.toLowerCase())) {
      return;
    }
    handleChange({ tags: [...normalizedValue.tags, tag] });
  };

  const removeTag = (tag: string) => {
    handleChange({ tags: normalizedValue.tags.filter((existing) => existing !== tag) });
  };

  const handleTagInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(tagInput);
      setTagInput("");
    } else if (event.key === "Backspace" && !tagInput && normalizedValue.tags.length) {
      const tags = normalizedValue.tags.slice(0, -1);
      handleChange({ tags });
    }
  };

  const handleTagInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (tagInput.trim()) {
      addTag(tagInput);
      setTagInput("");
    }
  };

  return (
    <div
      className={className}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 24,
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 40px rgba(15, 23, 42, 0.08)",
        maxWidth: 420,
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "#0f172a" }}>{title}</h3>
        {description && (
          <p style={{ margin: "8px 0 0", fontSize: 14, color: "#475569", lineHeight: 1.6 }}>{description}</p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#1e293b" }}>平台类型</span>
          <select
            value={normalizedValue.platform}
            onChange={(event) => handleChange({ platform: event.target.value })}
            style={{
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              padding: "10px 12px",
              fontSize: 14,
              color: "#0f172a",
            }}
          >
            <option value="" disabled>
              请选择平台
            </option>
            {platformOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#1e293b" }}>来源链接</span>
          <input
            type="url"
            placeholder="https://example.com"
            value={normalizedValue.url}
            onChange={(event) => handleChange({ url: event.target.value })}
            style={{
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              padding: "10px 12px",
              fontSize: 14,
              color: "#0f172a",
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#1e293b" }}>关键词标签</span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #cbd5f5",
              minHeight: 48,
            }}
          >
            {normalizedValue.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 999,
                  backgroundColor: "#e0f2fe",
                  color: "#0369a1",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#0f172a",
                    cursor: "pointer",
                    fontSize: 14,
                    lineHeight: 1,
                  }}
                  aria-label={`删除标签 ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={handleTagInputKeyDown}
              onBlur={handleTagInputBlur}
              placeholder={normalizedValue.tags.length ? "继续添加标签" : "输入关键词后回车"}
              style={{
                flexGrow: 1,
                minWidth: 120,
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "#0f172a",
              }}
            />
          </div>
          <span style={{ fontSize: 12, color: "#64748b" }}>可选，用于提升内容匹配度</span>
        </label>
      </div>
    </div>
  );
};

export default SourceSelectionCard;
