import React, { useState } from "react";
import "./App.css";
import NetworkGraph from "./components/NetworkGraph";

class Contact {
  constructor(name) {
    this.name = name;
    this.connections = [];
    this.canHelp = false;
  }
}

class ContactGraph {
  constructor() {
    this.contacts = new Map();
  }

  addContact(name) {
    if (!this.contacts.has(name)) {
      const contact = new Contact(name);
      this.contacts.set(name, contact);
    }
  }

  connectContacts(name1, name2) {
    const contact1 = this.contacts.get(name1);
    const contact2 = this.contacts.get(name2);
    if (contact1 && contact2 && !contact1.connections.includes(contact2)) {
      contact1.connections.push(contact2);
      contact2.connections.push(contact1);
    }
  }

  findHelp(startName) {
    const startContact = this.contacts.get(startName);
    if (!startContact) return "Starting contact not found";

    let queue = [startContact];
    let visited = new Set([startContact]);

    while (queue.length > 0) {
      const currentContact = queue.shift();

      if (currentContact !== startContact && currentContact.canHelp) {
        return `Help found through ${currentContact.name}`;
      }

      for (const neighbor of currentContact.connections) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return "No help found in the network.";
  }
}

function App() {
  const [graph, setGraph] = useState(new ContactGraph());
  const [contactName, setContactName] = useState("");
  const [canHelp, setCanHelp] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [helpSeeker, setHelpSeeker] = useState("");
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);

  const [selectedForUpdate, setSelectedForUpdate] = useState("");
  const [updateCanHelp, setUpdateCanHelp] = useState(false);

  const addContact = () => {
    if (contactName) {
      graph.addContact(contactName);
      const newContact = graph.contacts.get(contactName);
      if (newContact) {
        newContact.canHelp = canHelp;
      }
      setGraph((prevGraph) => {
        const newGraph = new ContactGraph();
        newGraph.contacts = new Map(prevGraph.contacts);
        return newGraph;
      });
      setContactName("");
      setCanHelp(false);
    }
  };

  const selectContactForConnection = (contactName, direction) => {
    if (direction === "from") {
      setSelectedFrom(contactName);
      if (contactName === selectedTo) {
        setSelectedTo(null);
      }
    } else if (direction === "to") {
      setSelectedTo(contactName);
      if (contactName === selectedFrom) {
        setSelectedFrom(null);
      }
    }
  };
  const renderContactsList = (direction) => {
    return (
      <div className="contacts-list">
        {Array.from(graph.contacts.values()).map((contact) => {
          const isSelected =
            direction === "from"
              ? selectedFrom === contact.name
              : selectedTo === contact.name;
          return (
            <div
              key={contact.name}
              className={`contact-item ${isSelected ? "selected" : ""}`}
              onClick={() =>
                selectContactForConnection(contact.name, direction)
              }
            >
              {contact.name}
            </div>
          );
        })}
      </div>
    );
  };

  const connectContacts = () => {
    if (selectedFrom && selectedTo) {
      graph.connectContacts(selectedFrom, selectedTo);
      setGraph((prevGraph) => {
        const newGraph = new ContactGraph();
        newGraph.contacts = new Map(prevGraph.contacts);
        return newGraph;
      });
      setSelectedFrom(null);
      setSelectedTo(null);
    }
  };
  const updateContactCanHelp = () => {
    if (selectedForUpdate) {
      const contact = graph.contacts.get(selectedForUpdate);
      if (contact) {
        contact.canHelp = updateCanHelp;
        setGraph((prevGraph) => {
          const newGraph = new ContactGraph();
          newGraph.contacts = new Map(prevGraph.contacts);
          return newGraph;
        });
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Emergency Contact Network</h1>
        <div className="form-section">
          <h2>Add New Contact</h2>
          <div className="form-group">
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Contact Name"
            />
            <label>
              <input
                type="checkbox"
                checked={canHelp}
                onChange={(e) => setCanHelp(e.target.checked)}
              />{" "}
              Can Help
            </label>
            <button onClick={addContact}>Add Contact</button>
          </div>
        </div>

        <div className="form-section">
          <h2>Connect Contacts</h2>
          <div className="form-group">
            <div>
              <h3>From</h3>
              {renderContactsList("from")}
            </div>
            <div>
              <h3>To</h3>
              {renderContactsList("to")}
            </div>
            <button
              onClick={connectContacts}
              disabled={!selectedFrom || !selectedTo}
            >
              Connect
            </button>
          </div>
        </div>

        <div className="form-section">
          <h2>Find Help</h2>
          <div className="form-group">
            <input
              value={helpSeeker}
              onChange={(e) => setHelpSeeker(e.target.value)}
              placeholder="Seeker's Name"
            />
            <button
              onClick={() => {
                const result = graph.findHelp(helpSeeker);
                setSearchResult(result);
              }}
            >
              Find Help
            </button>
          </div>
          <div className="result">Search Result: {searchResult}</div>
        </div>
        <div className="form-section">
          <h2>Update Can Help Status</h2>
          <div className="form-group">
            <select
              className="update-select"
              value={selectedForUpdate}
              onChange={(e) => {
                setSelectedForUpdate(e.target.value);
                const contact = graph.contacts.get(e.target.value);
                if (contact) {
                  setUpdateCanHelp(contact.canHelp);
                }
              }}
            >
              <option value="">Select a Contact</option>
              {Array.from(graph.contacts.values()).map((contact) => (
                <option key={contact.name} value={contact.name}>
                  {contact.name}
                </option>
              ))}
            </select>
            {selectedForUpdate && (
              <>
                <label className="update-checkbox">
                  <input
                    type="checkbox"
                    checked={updateCanHelp}
                    onChange={(e) => setUpdateCanHelp(e.target.checked)}
                  />{" "}
                  Can Help
                </label>
                <button
                  className="update-button"
                  onClick={() => updateContactCanHelp()}
                >
                  Update
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <NetworkGraph graph={graph} />
    </div>
  );
}

export default App;
