import style from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <div className={style.searchContainer}>
    {' '}
    <label className={style.search}>
      <input
        type="text"
        name="filter"
        placeholder=" "
        className={style.inputName}
        title="Enter search name"
        onChange={onChange}
        value={value}
      />
      <button type="reset"></button>
    </label>
  </div>
);

export default Filter;
