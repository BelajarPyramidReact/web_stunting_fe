import React from 'react';
import * as IconsVsc from 'react-icons/vsc';
import * as IconsFa from 'react-icons/fa';
import * as IconsMd from 'react-icons/md';

const ModernInput = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  error = '',
  className = '',
  icon,
  iconSet = 'vsc',
  options = [],
}) => {
  const inputClass = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
    error ? 'border-red-500' : 'border-teal-300'
  } ${icon ? 'pl-10' : ''} ${className}`;

  const IconComponent = icon
    ? {
        vsc: IconsVsc[`Vsc${icon}`],
        fa: IconsFa[`Fa${icon}`],
        md: IconsMd[`Md${icon}`],
      }[iconSet]
    : null;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={inputClass}
            rows="4"
          />
        );
      case 'select':
        return (
          <div className="relative">
            <select
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              className={`appearance-none w-full bg-white text-gray-800 py-2 px-3 border border-teal-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors cursor-pointer ${
                error ? 'border-red-500' : 'border-teal-300'
              } ${className}`}
            >
              {placeholder && <option value="">{placeholder}</option>}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* Ikon dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <IconsFa.FaChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        );
      case 'radio':
        return (
          <div className="flex flex-col">
            {options.map((option) => (
              <label key={option.value} className="inline-flex items-center">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  required={required}
                  className="form-radio text-teal-500"
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        );
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={inputClass}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-teal-700 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {IconComponent && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconComponent className="h-5 w-5 text-teal-500" />
          </div>
        )}
        {renderInput()}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default ModernInput;
