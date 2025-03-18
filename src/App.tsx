import React, { useState } from 'react';
import FormBuilder from './components/Builder';
import './App.css'

        function App() {
          const [formElements, setFormElements] = useState<React.ReactNode[]>([]);

          const handleFormBuilt = (elements: React.ReactNode[]) => {
            setFormElements(elements);
          };

          return (
          <div className='App'>
            <div className='App-header'>
              <FormBuilder onFormBuilt={handleFormBuilt} />
              </div>
              <div className="generated-form">
                <h3>Результат</h3>
                {formElements.map((el, i) => (
                  <div key={i} className="form-element">{el}</div>
                ))}
              </div>
            
            </div>
          );
        }

        export default App;