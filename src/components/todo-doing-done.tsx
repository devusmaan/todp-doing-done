// "use client";;

// import { useState } from "react"


// export default function TodoDoingDoTask() {



//     const [taskValue, setTaskValue] = useState("");
//     const [selectedCard, setSelectedCard] = useState("");
//     const [cardName, setCardName] = useState("");


//     // const [allCards, setAllCard] = useState<string[]>([]);

//     const [cards, setCards] = useState([
//         { id: 1, name: "Todo" },
//         { id: 2, name: "Doing" },
//         { id: 3, name: "Done" }
//     ]);


//     const [tasks, setTasks] = useState({
//         1: [],
//         2: [],
//         3: []
//     })

//     const [cardId, setCardId] = useState(4);






//     const [error, setError] = useState("");


//     // const [error2, setError2] = useState("");

//     const handleAddCard = () => {
//         if (!cardName.trim()) {
//             setError("Please enter a card name");

//             setTimeout(() => {
//                 setError("")
//             }, 2000);
//             return
//         }
//         const newCard = { id: cardId, name: cardName }
//         setCards([...cards, newCard]);
//         setTasks({ ...tasks, [cardId]: [] })
//         setCardName("");
//         setCardId(cardId + 1);
//         setError("")
//     }


//     const handleAddTask = () => {
//         if (!selectedCard) {
//             setError("Please Select a Card")
//             setTimeout(() => {
//                 setError("")
//             }, 2000);
//             return
//         }
//         if (!taskValue.trim()) {
//             setError("Please Enter a task");
//             return;
//         }
//         const selectedIdCard = parseInt(selectedCard);
//         const updatedTasks = { ...tasks };
//         setTasks(updatedTasks);
//         setTaskValue("")
//         setError("")
//     }


//     // const [todoArray, setTodoarray] = useState<string[]>([])
//     // const [doingArray, setDoingarray] = useState<string[]>([])
//     // const [doneArray, setDonearray] = useState<string[]>([])



//     // const cardValueButton = () => {
//     //     if (cardValue === "") {
//     //         setError2("Please Fill")
//     //         setTimeout(() => {
//     //             setError2("")
//     //         }, 2000);
//     //     } else {
//     //         setAllCard([...allCards, cardValue])
//     //     }

//     //     setCardValue("");
//     // }


//     // const AddValueButton = () => {

//     //     if (value === "" || !select) {

//     //         setError("Please Fill and Select.")
//     //         setTimeout(() => {
//     //             setError("")
//     //         }, 2000);


//     //     } else {
//     //         if (select === "todo") {
//     //             setTodoarray([...todoArray, value])
//     //         } else if (select === "doing") {
//     //             setDoingarray([...doingArray, value])
//     //         } else if (select === "done") {
//     //             setDonearray([...doneArray, value])
//     //         } else {

//     //             for (let index = 0; index < allCards.length; index++) {
//     //                 const element = allCards[index];

//     //                 if (select === element) {
//     //                     console.log(element, value);

//     //                 }

//     //             }

//     //         }
//     //     }
//     //     // console.log(value);
//     //     // console.log(select);



//     //     setValue("");
//     //     setSelect("")
//     // }




//     return (
//         <>
//             <div className="bg-[#ddd6ff] py-5 min-h-96 pt-10">
//                 <div className="flex justify-center pb-6">
//                     <h2>Create Task</h2>
//                     <input type="text" className="p-1 px-3 bg-[#5d4ea0] border-white text-white border-2 rounded-xl hover:border-3 duration-300 transition-discrete"
//                         value={taskValue} onChange={(e) => { setTaskValue(e.target.value) }}
//                     />




//                     <select className="mx-3 w-24 px-3 bg-[#5d4ea0] border-white border-2 text-white rounded-xl hover:border-3 duration-300 transition-discrete"
//                         value={selectedCard} onChange={(e) => { setSelectedCard(e.target.value) }}
//                     >
//                         {/* <option value="" disabled>Select</option>
//                         <option value="todo">Todo</option>
//                         <option value="doing">Doing</option>
//                         <option value="done">Done</option>
//                         {allCards.map((card, index) => (
//                             <option key={card + index} value={card}>{card}</option>
//                         ))} */}

//                         {cards.map((card) => (
//                             <option key={card.id} value={card.id}>{card.name}</option>
//                         ))}
//                     </select>

//                     <button className="hover:border-3 duration-300 transition-discrete text-white border-white border-2 w-24 rounded-2xl bg-[#5d4ea0]" onClick={handleAddTask}>Add</button>
//                 </div>
//                 {error && <p className="text-red-600 text-center transition-discrete">{error}</p>}


//                 <div>
//                     <h2>Create card</h2>
//                     <input type="text"
//                         value={cardName} onChange={(e) => { setCardName(e.target.value) }}
//                         className="p-1 px-3 bg-[#5d4ea0] border-white text-white border-2 rounded-xl hover:border-3 duration-300 transition-discrete" />
//                     <button className="hover:border-3 duration-300 transition-discrete text-white border-white border-2 w-24 rounded-2xl bg-[#5d4ea0]" onClick={handleAddCard}>Add Card</button>


//                     {error && <p className="text-red-600 text-center transition-discrete">{error}</p>}

//                 </div>


//                 <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 lg:mx-14 my-5">
//                     {/* <div className="border-white border-4 rounded-3xl h-72"> */}
//                     {/* <h2 className="font-bold text-center text-xl py-3">Todo</h2>  */}

//                     {cards.map((card) => (

//                         <div className="border-white border-4 rounded-3xl h-72" key={card.id}>
//                             <h2>{card.name}</h2>

//                             <ul>
//                                 {tasks[card.id] && tasks[card.id].map((task, index) => (
//                                     <li className="text-center" key={index}>{index + 1 + ") " + task}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                         /* <li className="text-center" key={index}>{index + 1 + ") " + card}</li> */

//                     ))}

//                 </div>
//                 {/* <div className="border-white border-4 rounded-3xl h-72">
//                         <h2 className="font-bold text-center text-xl py-3">Doing</h2>
//                         <ul>
//                             {doingArray.map((doing, index) => (
//                                 <li className="text-center" key={doing + index}>{index + 1 + ") " + doing}</li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="border-white border-4 rounded-3xl h-72">
//                         <h2 className="font-bold text-center text-xl py-3">Done</h2>
//                         <ul>
//                             {doneArray.map((done, index) => (
//                                 <li className="text-center" key={done + index}>{index + 1 + ") " + done}</li>
//                             ))}
//                         </ul>
//                     </div>


//                     {allCards.map((card, index) => (
//                         <div key={card + index} className="border-white border-4 rounded-3xl h-72">
//                             <h2 className="font-bold text-center text-xl py-3" key={card + index}>{card}</h2>

//                         </div>

//                     ))} */}


//             </div>

//             {/* </div> */}
//         </>
//     )
// } 












//////////////////////////////


//  const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     }),
//   );

//   function handleDragStart(event: DragStartEvent) {
//     const { active } = event;
//     const { id } = active;
//     setActiveId(id);
//   }

//   const handleDragMove = (event: DragMoveEvent) => {
//     const { active, over } = event;

//     // Handle Items Sorting
//     if (
//       active.id.toString().includes('item') &&
//       over?.id.toString().includes('item') &&
//       active &&
//       over &&
//       active.id !== over.id
//     ) {
//       // Find the active container and over container
//       const activeContainer = findValueOfItems(active.id, 'item');
//       const overContainer = findValueOfItems(over.id, 'item');

//       // If the active or over container is not found, return
//       if (!activeContainer || !overContainer) return;

//       // Find the index of the active and over container
//       const activeContainerIndex = containers.findIndex(
//         (container) => container.id === activeContainer.id,
//       );
//       const overContainerIndex = containers.findIndex(
//         (container) => container.id === overContainer.id,
//       );

//       // Find the index of the active and over item
//       const activeitemIndex = activeContainer.items.findIndex(
//         (item) => item.id === active.id,
//       );
//       const overitemIndex = overContainer.items.findIndex(
//         (item) => item.id === over.id,
//       );
//       // In the same container
//       if (activeContainerIndex === overContainerIndex) {
//         let newItems = [...containers];
//         newItems[activeContainerIndex].items = arrayMove(
//           newItems[activeContainerIndex].items,
//           activeitemIndex,
//           overitemIndex,
//         );

//         setContainers(newItems);
//       } else {
//         // In different containers
//         let newItems = [...containers];
//         const [removeditem] = newItems[activeContainerIndex].items.splice(
//           activeitemIndex,
//           1,
//         );
//         newItems[overContainerIndex].items.splice(
//           overitemIndex,
//           0,
//           removeditem,
//         );
//         setContainers(newItems);
//       }
//     }

//     // Handling Item Drop Into a Container
//     if (
//       active.id.toString().includes('item') &&
//       over?.id.toString().includes('container') &&
//       active &&
//       over &&
//       active.id !== over.id
//     ) {
//       // Find the active and over container
//       const activeContainer = findValueOfItems(active.id, 'item');
//       const overContainer = findValueOfItems(over.id, 'container');

//       // If the active or over container is not found, return
//       if (!activeContainer || !overContainer) return;

//       // Find the index of the active and over container
//       const activeContainerIndex = containers.findIndex(
//         (container) => container.id === activeContainer.id,
//       );
//       const overContainerIndex = containers.findIndex(
//         (container) => container.id === overContainer.id,
//       );

//       // Find the index of the active and over item
//       const activeitemIndex = activeContainer.items.findIndex(
//         (item) => item.id === active.id,
//       );

//       // Remove the active item from the active container and add it to the over container
//       let newItems = [...containers];
//       const [removeditem] = newItems[activeContainerIndex].items.splice(
//         activeitemIndex,
//         1,
//       );
//       newItems[overContainerIndex].items.push(removeditem);
//       setContainers(newItems);
//     }
//   };

//   // This is the function that handles the sorting of the containers and items when the user is done dragging.
//   function handleDragEnd(event: DragEndEvent) {
//     const { active, over } = event;

//     // Handling Container Sorting
//     if (
//       active.id.toString().includes('container') &&
//       over?.id.toString().includes('container') &&
//       active &&
//       over &&
//       active.id !== over.id
//     ) {
//       // Find the index of the active and over container
//       const activeContainerIndex = containers.findIndex(
//         (container) => container.id === active.id,
//       );
//       const overContainerIndex = containers.findIndex(
//         (container) => container.id === over.id,
//       );
//       // Swap the active and over container
//       let newItems = [...containers];
//       newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
//       setContainers(newItems);
//     }

//     // Handling item Sorting
//     if (
//       active.id.toString().includes('item') &&
//       over?.id.toString().includes('item') &&
//       active &&
//       over &&
//       active.id !== over.id
//     ) {
//       // Find the active and over container
//       const activeContainer = findValueOfItems(active.id, 'item');
//       const overContainer = findValueOfItems(over.id, 'item');

//       // If the active or over container is not found, return
//       if (!activeContainer || !overContainer) return;
//       // Find the index of the active and over container
//       const activeContainerIndex = containers.findIndex(
//         (container) => container.id === activeContainer.id,
//       );
//       const overContainerIndex = containers.findIndex(
//         (container) => container.id === overContainer.id,
//       );
//       // Find the index of the active and over item
//       const activeitemIndex = activeContainer.items.findIndex(
//         (item) => item.id === active.id,
//       );
//       const overitemIndex = overContainer.items.findIndex(
//         (item) => item.id === over.id,
//       );

//       // In the same container
//       if (activeContainerIndex === overContainerIndex) {
//         let newItems = [...containers];
//         newItems[activeContainerIndex].items = arrayMove(
//           newItems[activeContainerIndex].items,
//           activeitemIndex,
//           overitemIndex,
//         );
//         setContainers(newItems);
//       } else {
//         // In different containers
//         let newItems = [...containers];
//         const [removeditem] = newItems[activeContainerIndex].items.splice(
//           activeitemIndex,
//           1,
//         );
//         newItems[overContainerIndex].items.splice(
//           overitemIndex,
//           0,
//           removeditem,
//         );
//         setContainers(newItems);
//       }
//     }
//     // Handling item dropping into Container
//     if (
//       active.id.toString().includes('item') &&
//       over?.id.toString().includes('container') &&
//       active &&
//       over &&
//       active.id !== over.id
//     ) {
//       // Find the active and over container
//       const activeContainer = findValueOfItems(active.id, 'item');
//       const overContainer = findValueOfItems(over.id, 'container');

//       // If the active or over container is not found, return
//       if (!activeContainer || !overContainer) return;
//       // Find the index of the active and over container
//       const activeContainerIndex = containers.findIndex(
//         (container) => container.id === activeContainer.id,
//       );
//       const overContainerIndex = containers.findIndex(
//         (container) => container.id === overContainer.id,
//       );
//       // Find the index of the active and over item
//       const activeitemIndex = activeContainer.items.findIndex(
//         (item) => item.id === active.id,
//       );

//       let newItems = [...containers];
//       const [removeditem] = newItems[activeContainerIndex].items.splice(
//         activeitemIndex,
//         1,
//       );
//       newItems[overContainerIndex].items.push(removeditem);
//       setContainers(newItems);
//     }
//     setActiveId(null);
//   }