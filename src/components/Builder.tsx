import React, { useState, useCallback } from 'react';

interface FormBuilderProps {
  onFormBuilt: (elements: React.ReactNode[]) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ onFormBuilt }) => {
  const [counts, setCounts] = useState({ input: 0, textarea: 0, checkbox: 0 });
  const [showFormControls, setShowFormControls] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof counts) => {
      setCounts(prev => ({ ...prev, [key]: parseInt(e.target.value, 10) || 0 }));
    },
    []
  );

  const buildForm = useCallback(() => {
    const elements: React.ReactNode[] = [];

    const createElements = (count: number, type: string, elementType: 'input' | 'textarea' | 'checkbox') => {
      for (let i = 0; i < count; i++) {
        const key = `${type}-${i}`;
        const placeholder = `${type} ${i + 1}`; // Объединение в одну строку
        elements.push(
          elementType === 'checkbox' ? (
            <div key={key}>
              <input type="checkbox" id={key} />
              <label htmlFor={key}>{placeholder}</label> </div>
          ) : (
            React.createElement(elementType, { key, placeholder })
          )
        );
      }
    };

    createElements(counts.input, 'Input', 'input');
    createElements(counts.textarea, 'Textarea', 'textarea');
    createElements(counts.checkbox, 'Checkbox', 'checkbox');

    onFormBuilt(elements);
  }, [counts, onFormBuilt]);

  const renderInput = useCallback(
    (label: string, key: keyof typeof counts) => (
      <div key={key}> {/* Добавили ключ для уникальности */}
        <label>{label}: </label>
        <input type="number" value={counts[key]} onChange={e => handleChange(e, key)} />
      </div>
    ),
    [handleChange, counts]
  );

  const handleToggleFormControls = useCallback(() => {
    setShowFormControls(!showFormControls);
  }, [showFormControls]);

  return (
    <>
      <h2>Конструктор</h2>
      <button onClick={handleToggleFormControls}>{showFormControls ? 'Close' : 'Form'}</button>
      {showFormControls && (
        <>
          {renderInput('Input', 'input')}
          {renderInput('Textarea', 'textarea')}
          {renderInput('Checkbox', 'checkbox')}
          <button onClick={buildForm}>Build</button>
        </>
      )}
    </>
  );
};

export default FormBuilder;