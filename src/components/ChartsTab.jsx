// src/components/ChartsTab.jsx
import Charts from "./Charts";

const ChartsTab = ({ roi_projection, nearby_properties }) => {
  return (
    <div className="p-4">
      <Charts
        roi_projection={roi_projection}
        nearby_properties={nearby_properties}
      />
    </div>
  );
};

export default ChartsTab;
