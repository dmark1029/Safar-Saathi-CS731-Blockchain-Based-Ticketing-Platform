# CS731_workspace
This is the repository for the ongoing project in the course cs731

## Instructions to Run
1.	Clone the main branch from the GitHub Repository
https://github.com/kuldeep-singh-chouhan/CS731_workspace.git

2.	Change the directory to CS731_workspace

3.	truffle directory contains the contracts and migrations, and client directory contains the front-end code.

4.	Ensure truffle is installed, using command
truffle --version
Truffle v5.8.1 (core: 5.8.1)
Ganache v7.7.7
Solidity v0.5.16 (solc-js)      
Node v16.17.0
Web3.js v1.8.2

Download the GUI of Ganache and open it.

5.	Change the directory to truffle and migrate the smart contract.

cd truffle
truffle migrate

6.	Open a new terminal and change directory to client and install npm

cd ..
cd client
npm install --force

7.	Start the frontend portal
npm start

8.	Go to the localhost http://localhost:8080/
9.	Set up Ganache local wallet in MetaMask 
a.	Login to MetaMask
b.	Manually setup Ganache with the given details

 

c.	Open Ganache and import an account from private key
By clicking the key logo shown below

  
d.	Import the account in MetaMask, through clicking import account and then enter and save the private key. Connect to that account.
 
10.	You are all set when prompted to create a new user.