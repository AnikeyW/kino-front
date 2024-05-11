import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./EditableTextarea.module.scss";

interface Props {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EditableTextarea: FC<Props> = ({ label, value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const keyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setIsEditMode(false);
    }
  };

  useEffect(() => {
    if (isEditMode && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <>
      {isEditMode ? (
        <div>
          <span className={styles.label}>{label}</span>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditMode(false)}
            onKeyDown={keyDownHandler}
            className={styles.textarea}
          />
        </div>
      ) : (
        <div
          onDoubleClick={() => setIsEditMode(true)}
          className={styles.title}
          title={"DoubleClick for edit"}
        >
          <span className={styles.label}>{label}</span>
          {value}
        </div>
      )}
    </>
  );
};

export default EditableTextarea;
