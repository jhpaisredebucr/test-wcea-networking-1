function FamilyNode({ person }) {
  return (
    <div style={{ marginLeft: "20px" }}>
      <div
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          display: "inline-block",
          borderRadius: "6px",
          background: "#f9f9f9"
        }}
      >
        {person.name}
      </div>

      {person.children && (
        <div style={{ marginLeft: "20px", marginTop: "10px" }}>
          {person.children.map((child, index) => (
            <FamilyNode key={index} person={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Page() {
//   const familyTree = {
//     name: "Juan Dela Cruz",
//     children: [
//       {
//         name: "Maria Dela Cruz",
//         children: [
//           { name: "Ana Santos" },
//           { name: "Pedro Santos" }
//         ]
//       },
//       {
//         name: "Jose Dela Cruz",
//         children: [{ name: "Luis Cruz" }]
//       }
//     ]
//   };

  return (
    <main style={{ padding: "40px" }}>
      {/* <h1>Family Tree</h1>
      <FamilyNode person={familyTree} /> */}
    </main>
  );
}