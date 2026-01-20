// import { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [slotsData, setSlotsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("/api/slots") // keep same endpoint
//       .then((res) => {
//         console.log("Slots API response:", res.data);

//         // Ensure we always store an ARRAY
//         if (Array.isArray(res.data)) {
//           setSlotsData(res.data);
//         } else if (Array.isArray(res.data.slots)) {
//           setSlotsData(res.data.slots);
//         } else {
//           setSlotsData([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Slots API error:", err);
//         setSlotsData([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const totalSlots = Array.isArray(slotsData) ? slotsData.length : 0;
//   const occupied = Array.isArray(slotsData)
//     ? slotsData.filter((s) => s.isOccupied === true).length
//     : 0;
//   const vacant = totalSlots - occupied;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Campus image */}
//       <div className="rounded-lg overflow-hidden shadow">
//         <img
//           src="/campus-iit-mandi.jpeg"
//           alt="IIT Mandi Campus"
//           className="w-full h-56 object-cover"
//         />
//       </div>

//       {/* Title */}
//       <div>
//         <h2 className="text-2xl font-bold">Dashboard</h2>
//         <p className="text-gray-600">
//           Real-time overview of parking slots
//         </p>
//       </div>

//       {/* Stats */}
//       {loading ? (
//         <p className="text-lg">Loading dashboard data...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <div className="bg-white rounded-lg shadow p-4 text-center">
//             <p className="text-sm text-gray-500">Total Slots</p>
//             <p className="text-3xl font-bold">{totalSlots}</p>
//           </div>

//           <div className="bg-white rounded-lg shadow p-4 text-center">
//             <p className="text-sm text-gray-500">Vacant Slots</p>
//             <p className="text-3xl font-bold text-green-600">{vacant}</p>
//           </div>

//           <div className="bg-white rounded-lg shadow p-4 text-center">
//             <p className="text-sm text-gray-500">Occupied Slots</p>
//             <p className="text-3xl font-bold text-red-600">{occupied}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/slots")
      .then((res) => {
        // JSON-server returns ARRAY here
        setSlots(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching slots:", err);
        setSlots([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalSlots = slots.length;

  // adjust field name if needed
  const occupied = slots.filter(
    (slot) => slot.status === "occupied" || slot.isOccupied === true
  ).length;

  const vacant = totalSlots - occupied;

  return (
    <div className="p-6 space-y-6">
      {/* Campus image */}
      <div className="rounded-lg overflow-hidden shadow">
        <img
          src="/campus-iit-mandi.jpg"
          alt="IIT Mandi Campus"
          className="w-full h-56 object-cover"
        />
      </div>

      <h2 className="text-2xl font-bold">Dashboard</h2>

      {loading ? (
        <p>Loading slot statistics...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Total Slots</p>
            <p className="text-3xl font-bold">{totalSlots}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Vacant</p>
            <p className="text-3xl font-bold text-green-600">{vacant}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-500">Occupied</p>
            <p className="text-3xl font-bold text-red-600">{occupied}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
