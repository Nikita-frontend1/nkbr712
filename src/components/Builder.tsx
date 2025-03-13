import React, { useState } from 'react';

const FormBuilder: React.FC = () => {
  const [options, setOptions] = useState({ input: 0, textarea: 0, checkbox: 0 });
  const [form, setForm] = useState<React.ReactNode[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof options) =>
    setOptions(prev => ({ ...prev, [key]:  parseInt(e.target.value, 10) || 0 }));

  const buildForm = () => {
    const elements = [];
    for (let i = 0; i < options.input; i++) elements.push(<input key={`input-${i}`} type="text" placeholder={`Input ${i + 1}`} />);
    for (let i = 0; i < options.textarea; i++) elements.push(<textarea key={`textarea-${i}`} placeholder={`Textarea ${i + 1}`} />);
    for (let i = 0; i < options.checkbox; i++) {
      const id = `checkbox-${i}`;
      elements.push(<div key={id}><input type="checkbox" id={id} /><label htmlFor={id}>{`Checkbox ${i + 1}`}</label></div>);
    }
    setForm(elements);
  };

  const renderInput = (label: string, key: keyof typeof options) => (
    <div>
      <label>{label}: </label>
      <input type="number" value={options[key]} onChange={e => handleChange(e, key)}  />
    </div>
  );

  return (
    <div>
      <h2>Конструктор</h2>
      {['Input', 'Textarea', 'Checkbox'].map(type => renderInput(type, type.toLowerCase() as keyof typeof options))}
      <button onClick={buildForm}>Build</button>
      <div className="generated-form">
        <h3>Результат</h3>
        {form.map((el, i) => <div key={i} className="form-element">{el}</div>)}
      </div>
    </div>
  );
};

export default FormBuilder;