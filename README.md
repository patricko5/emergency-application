# Emergency Contact Network Application

## Introduction

The Emergency Contact Network application is designed to help individuals find assistance within their network of contacts during emergencies. Utilizing a graph data structure, this application models the complex interconnections between individuals, allowing for efficient navigation and search capabilities through the network.

## Features

- **Contact Management**: Add new contacts to your network and specify their ability to provide help.
- **Connection Establishment**: Connect individuals within the network to reflect real-world social relationships.
- **Help Seeking**: Utilize a breadth-first search algorithm to find the nearest available help within the network.

## Getting Started

To get the application running on your local machine, follow these steps:

1. **Clone the Repository**
     git clone https://github.com/yourusername/emergency-contact-network.git
2. **Install Dependencies**
      Navigate to the project directory and run:
      npm install
3. **Start the Application**
   npm start

## Usage

### Adding Contacts

- Navigate to the "Add New Contact" section.
- Enter the contact's name and specify if they can provide help by checking the "Can Help" box.
- Click "Add Contact" to include them in your network.

### Connecting Contacts

- In the "Connect Contacts" section, use the "From" and "To" dropdowns to select two contacts you wish to connect.
- Click "Connect" to establish a bidirectional relationship between the selected contacts.

### Seeking Help

- To find help within your network, enter the name of the help seeker in the "Seeker's Name" input field in the "Find Help" section.
- Click "Find Help" to search the network. The application will display the nearest contact who can assist.

## Technology Stack

- **Frontend**: React.js
- **State Management**: React Hooks
- **Data Structure**: Custom Graph Implementation
- **Styling**: CSS

## Contributing

Contributions to the Emergency Contact Network application are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## Contact

Patrick Orihuela - dev.patricko5@gmail.com

Project Link: [https://github.com/patricko5/safety-application](https://github.com/patricko5/safety-application)


   
