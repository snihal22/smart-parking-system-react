
// pages/Vehicles.jsx
import { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  GetSlotApi,
  GetVehiclesData,
  PostVehiclesData,
  PutVehiclesData,
  PutSlotApi,
} from "./AxiosData";
import { Theme } from "./Theme";

const Vehicles = () => {
  const { theme } = useContext(Theme);

  // Vehicles state
  const [vehiclesData, setVehiclesData] = useState({
    originalData: [],
    filteredData: [],
  });

  // Slots state
  const [slots, setSlots] = useState({
    originalData: [],
    sortedData: [],
  });

  // Input state
  const [inputValue, setInputValue] = useState({
    vehicleNumber: "",
    ownerName: "",
    selectedSlot: "",
  });

  /* ---------------- FETCH FUNCTIONS ---------------- */

  async function getVehicles() {
    const resp = await GetVehiclesData();
    setVehiclesData({
      originalData: resp.data,
      filteredData: resp.data,
    });
  }

  async function getSlots() {
    const resp = await GetSlotApi();
    setSlots({
      originalData: resp.data,
      sortedData: resp.data,
    });
  }

  useEffect(() => {
    getVehicles();
    getSlots();
  }, []);

  /* ---------------- ADD VEHICLE ---------------- */

  async function handleAddVehicles() {
    try {
      const { vehicleNumber, ownerName, selectedSlot } = inputValue;

      if (!vehicleNumber || !ownerName || !selectedSlot) {
        alert("Fill all fields");
        return;
      }

      const numberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/i;
      const ownerRegex = /^[a-zA-Z\s]+$/;

      if (!numberRegex.test(vehicleNumber) || !ownerRegex.test(ownerName)) {
        alert("Invalid vehicle number or owner name");
        return;
      }

      const selectedSlotObj = slots.originalData.find(
        (s) => s.slotNumber === selectedSlot
      );

      if (!selectedSlotObj || selectedSlotObj.status !== "vacant") {
        alert("Slot already occupied");
        return;
      }

      // 1️⃣ Occupy slot
      await PutSlotApi(selectedSlotObj.id, {
        ...selectedSlotObj,
        status: "occupied",
      });

      // 2️⃣ Add vehicle
      await PostVehiclesData({
        vehicleNumber: vehicleNumber.toUpperCase(),
        ownerName:
          ownerName.charAt(0).toUpperCase() + ownerName.slice(1),
        selectedSlot,
        status: "parked",
      });

      // 3️⃣ Refresh data
      getVehicles();
      getSlots();

      // 4️⃣ Reset form
      setInputValue({
        vehicleNumber: "",
        ownerName: "",
        selectedSlot: "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  /* ---------------- REMOVE VEHICLE ---------------- */

  async function handleDelete(id) {
    const vehicle = vehiclesData.originalData.find((v) => v.id === id);
    if (!vehicle) return;

    const slotObj = slots.originalData.find(
      (s) => s.slotNumber === vehicle.selectedSlot
    );

    // Free slot
    if (slotObj) {
      await PutSlotApi(slotObj.id, {
        ...slotObj,
        status: "vacant",
      });
    }

    // Mark vehicle left
    await PutVehiclesData(id, {
      ...vehicle,
      status: "left",
    });

    getVehicles();
    getSlots();
  }

  /* ---------------- SEARCH & FILTER ---------------- */

  function handleSearching(value) {
    if (!value) {
      setVehiclesData((prev) => ({
        ...prev,
        filteredData: prev.originalData,
      }));
      return;
    }

    const filtered = vehiclesData.originalData.filter((v) =>
      v.vehicleNumber.includes(value.toUpperCase())
    );

    setVehiclesData((prev) => ({ ...prev, filteredData: filtered }));
  }

  function handleSorting(value) {
    if (!value) {
      setVehiclesData((prev) => ({
        ...prev,
        filteredData: prev.originalData,
      }));
      return;
    }

    const filtered = vehiclesData.originalData.filter(
      (v) => v.status === value
    );

    setVehiclesData((prev) => ({ ...prev, filteredData: filtered }));
  }

  /* ---------------- UI ---------------- */

  return (
    <div
className={`px-3 py-2 border rounded-lg outline-none
  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  ${theme === 'dark'
    ? 'bg-gray-900 text-white placeholder:text-gray-300 border-gray-600'
    : 'bg-gray-100 text-black placeholder:text-gray-500 border-gray-300'
  }`}

    >
      <h1 className="text-red-600 font-semibold text-3xl">
        {/* Note : Start Json Server at Port 5000 */}
      </h1>

      {/* Add Vehicle */}
      <div className="rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Park New Vehicle</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Vehicle Number"
            value={inputValue.vehicleNumber}
            onChange={(e) =>
              setInputValue({ ...inputValue, vehicleNumber: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Owner Name"
            value={inputValue.ownerName}
            onChange={(e) =>
              setInputValue({ ...inputValue, ownerName: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          />

          <select
            value={inputValue.selectedSlot}
            onChange={(e) =>
              setInputValue({ ...inputValue, selectedSlot: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Select Slot</option>
            {slots.sortedData
              .filter((s) => s.status === "vacant")
              .sort((a, b) => a.slotNumber.localeCompare(b.slotNumber))
              .map((slot) => (
                <option key={slot.id} value={slot.slotNumber}>
                  {slot.slotNumber}
                </option>
              ))}
          </select>
        </div>

        <button
          onClick={handleAddVehicles}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Park Vehicle
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by vehicle number"
            onChange={(e) => handleSearching(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <select
          onChange={(e) => handleSorting(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="parked">Parked</option>
          <option value="left">Left</option>
        </select>
      </div>

      {/* Vehicle Table */}
      <div className="rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-6 py-3 text-left">Vehicle</th>
              <th className="px-6 py-3 text-left">Owner</th>
              <th className="px-6 py-3 text-left">Slot</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesData.filteredData.length > 0 ? (
              vehiclesData.filteredData.map((v) => (
                <tr key={v.id} className="border-t">
                  <td className="px-6 py-4">{v.vehicleNumber}</td>
                  <td className="px-6 py-4">{v.ownerName}</td>
                  <td className="px-6 py-4">{v.selectedSlot}</td>
                  <td className="px-6 py-4">{v.status}</td>
                  <td className="px-6 py-4">
                    {v.status === "parked" && (
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="text-red-500"
                      >
                        Remove Vehicle
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-red-500">
                  No vehicles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehicles;

