import SelectDropdown from "./components/Fields/SelectDropdown";
import { months } from "./constants/years";

const MonthDashboard = () => {
  return (
    <div className="mx-auto md:max-w-4xl ">
      <div className="flex justify-end pt-10">
        <SelectDropdown
          options={months}
          onChange={(value) => console.log("Selected month:", value)}
          placeholder="Select a month"
        />
      </div>
    </div>
  );
};

export default MonthDashboard;
