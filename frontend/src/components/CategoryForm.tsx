/**
 * Form component for adding/editing expenses
 */

import React, { useState } from "react";
import { CategoryFormData } from "../types";
import { TextField, Button } from "../vibes";
import { useCategoryForm } from "../hooks/useCategoryForm";
import EmojiPicker from "emoji-picker-react";


interface CategoryFormProps {
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function CategoryForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Add Category",
}: CategoryFormProps) {
  const [showPicker, setShowPicker] = useState(false);
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useCategoryForm({
      initialData,
      onSubmit,
    });

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

 

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
 

      <TextField
        label="Category Name"
        type="text"
        placeholder="Enter category name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        fullWidth
        required
      />
      
      <div style={{ position: "relative" }}>
    <label style={{ display: "block", marginBottom: 8 }}>
      Category Icon
    </label>

    <button
      type="button"
      onClick={() => setShowPicker(!showPicker)}
      style={{
        width: "100%",
        padding: "5px 12px",
        border: "1px solid #CCCCCC",
        borderRadius: 6,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: 28 }}>
        {formData.icon || "📁"}
      </span>

      <span>
        {formData.icon ? "Change Icon" : "Choose Icon"}
      </span>
    </button>

    {showPicker && (
      <div
        style={{
          position: "absolute",
          top: "100%",
          marginTop: 8,
          zIndex: 100,
        }}
      >
        <EmojiPicker
          onEmojiClick={(emojiData) => {
            handleChange("icon", emojiData.emoji);
            setShowPicker(false);
          }}
        />
      </div>
    )}
  </div>


      <div style={buttonGroupStyle}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
