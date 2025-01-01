import PropTypes from 'prop-types'

const InputField = ({
  containerClass,
  label,
  labelClass,
  inputClass,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className={containerClass}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        id={name}
        className={inputClass}
      />
    </div>
  )
}

export default InputField

InputField.propTypes = {
  containerClass: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
}
