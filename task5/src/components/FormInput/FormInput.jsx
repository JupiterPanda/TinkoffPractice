import "./FormInput.scss";

export const FormInput = ({
	name,
	value,
	onChange,
	type,
	placeholder,
	label,
	textarea,
	required,
}) => {
	return (
		<div className="control">
			<label htmlFor={name}>{label}</label>
			{textarea ? (
				<textarea
					className="input"
					value={value}
					onChange={onChange}
					name={name}
					id={name}
					placeholder={placeholder}
					required={required}
				/>
			) : (
				<input
					className="input"
					value={value}
					onChange={onChange}
					name={name}
					id={name}
					type={type}
					placeholder={placeholder}
					required={required}
				/>
			)}
		</div>
	);
};
