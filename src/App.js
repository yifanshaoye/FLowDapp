import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { query } from "@onflow/fcl"


function App() {
  const [bookcount, setBookCount] = useState(0)

  useEffect(() => {
    const fetchBookCount = async () => {
      try {
        let res = await query({
          cadence: `
          import HelloWorld from 0xf4f8e2aa8f2ee51f
  
          pub fun main(): Int {
          
            let countRef = getAccount(0xf4f8e2aa8f2ee51f).getCapability(HelloWorld.BookShelfCountPath).borrow<&HelloWorld.BookShelf{HelloWorld.Count}>()
                  ?? panic("can't borrow count bsf")
                  
              return countRef.getBookCount()
          
          }
          `,
        });
        console.log(res)
        setBookCount(res)
      } catch (err) {
        console.log("fetch book cnt err: ", err)
      }
    }
    fetchBookCount()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br></br>
        Fetch {bookcount} Books
      </header>
    </div>
  );
}

export default App;
