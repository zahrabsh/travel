import { useState } from "react";
import "./App.css";

let initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setitems] = useState(initialItems);

  function handelAddItemes(item) {
    setitems((items) => [...items, item]);
  }
  function handelDeleteItem(id) {
    setitems((items) => items.filter((item) => item.id !== id));
  }
  function handelUpdateItem(id) {
    setitems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handelClearList() {
    const confirm = window.confirm("Are you sure that delete all Items?");

    if (confirm) setitems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handelAddItemes} />
      <Packing
        items={items}
        onDeleteItem={handelDeleteItem}
        onUpdate={handelUpdateItem}
        onClearItem={handelClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🎄 FAR AWAY 💼</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleonsubmit(e) {
    e.preventDefault();

    const newItem = { id: Date.now(), description, quantity, packed: false };

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleonsubmit}>
      <h3> what do you need for your 😍 trip?</h3>
      <select
        name="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}

function Packing({ items, onDeleteItem, onUpdate, onClearItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItem;
  if (sortBy === "input") sortedItem = items;

  if (sortBy === "description")
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "pack")
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input Item</option>
          <option value="description">Sort By description Item</option>
          <option value="pack">Sort By Packed Item</option>
        </select>
        <button onClick={onClearItem}>Clear List </button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItem, onUpdate }) {
  return (
    <div>
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onUpdate(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    </div>
  );
}
function Stats({ items }) {
  const numItem = items.length;
  const numPackedItem = items.filter((item) => item.packed).length;
  const persent = Math.round((numPackedItem / numItem) * 100);
  return (
    <footer className="stats">
      <em>
        {" "}
        {persent === 100
          ? "You got evreything, Ready to go ✈"
          : `💼 You have ${numItem} item on your list, and you already packed ${numPackedItem} item (${persent}%)`}
      </em>
    </footer>
  );
}
