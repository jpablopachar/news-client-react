import PropTypes from 'prop-types'

const SelectField = ({
  containerClass,
  label,
  labelClass,
  selectClass,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div className={containerClass}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        id={name}
        className={selectClass}
      >
        <option value="">--- Select {label} ---</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField

SelectField.propTypes = {
  containerClass: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  selectClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
}
