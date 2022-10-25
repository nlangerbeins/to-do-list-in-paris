import './App.css';
import { data } from './data';
import { useState } from 'react';

function App() {
  const [place, setPlace] = useState(0);
  const {id, image, titel, description, showMore} = data[place];

  //Read more button
  const [readMore, setReadMore] = useState(false);
  const readMoreOnClick = (element) => {
    element.showMore = !element.showMore;
    setReadMore(!readMore);
  }

  //Slides
  const back = () => {
    setPlace (place => {
      place --;
      if (place < 0) {
        place = data.length - 1;
      }
      return place;
    })
  }

  const next = () => {
    setPlace (place => {
      place ++;
      if (place > data.length -1) {
        place = 0;
      }
      return place;
    })
  }

  // to Do List
  const [toDoList, setToDoList] = useState([]); 

  const addToList = (id) => {
    if(!toDoList.find (item => item.id === id)) {
      let placesArray = [...toDoList];

      data.forEach (item => {
        if (item.id === id) {
          const clickedPlace = {...item};
          placesArray.push(clickedPlace)
        }
      })
      setToDoList(placesArray)
    }
  }


  // const addToList = (id) => {
  //   setToDoList (place => [...place, titel]);
  //   console.log(toDoList);
  // }

  //Deleting an item from to Do List
  const removeElement = (item) => {
    let newList = toDoList.filter(toDo => toDo.id !== item.id);
    setToDoList(newList);
  }
 

  return (
    <div className='wrapper'>
      <h1>Top 10 Things to Do in Paris</h1>
      <div className='slides_wrapper'>
        <button onClick={back} className='btn_back'>back</button>
        <div className='slides'>
          <img src={image} alt='paris' width="700px" ></img>
        </div>
        <button onClick={next} className='btn_next'>next</button>
      </div>
      <h2>{id}. {titel}</h2>
      <div className='description_wrapper'>
        <p>{showMore ? description : description.substring(0, 220) + '...'}
          <button onClick={() => readMoreOnClick(data[place])} className='btn_read'>{showMore ? 'Read less' : 'Read more'}</button>
        </p>
      </div>
      <div className='btn_add__wrapper'>
        <button onClick={() => addToList(id)} className='btn_add'>Add to my to Do List</button>
      </div>
      <div  className='list_wrapper'>
        <ul className='list'>
          {
            toDoList.map(item => 
              <li key={item.id}>{item.titel} 
                <button onClick={() => removeElement(item)} className='btn_deleteItem'>Delete</button>
              </li>)
            }
          </ul>
        </div>

      <div className='btn_deleteAll__wrapper'>
        <button onClick={() => setToDoList([])} className='btn_deleteAll'>Delete All</button>
      </div>
    </div>
  );
}

export default App;
