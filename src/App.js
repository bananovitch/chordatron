import React, {useState} from "react";
import "./main.css";

export const App = () => {

  //The music theory
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const scales = ["Ionian","Dorian","Phrygian","Lydian","Mixolydian","Aeolian","Locrian"]
  const majorIntervals = [2,2,1,2,2,2,1]

  const scaleOffsets = {
    Ionian: 0,
    Dorian: 1,
    Phrygian: 2,
    Lydian: 3,
    Mixolydian: 4,
    Aeolian: 5,
    Locrian: 6,
  }

  //utility function to offset arrays
  const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];
  
  
  const [selectedNote, selectNewNote] = useState("C");
  
  const [selectedScale, selectNewScale] = useState("Ionian");

  const [intervals, setIntervals] = useState(majorIntervals)

  const onScaleChange = (scaleName) => {
    selectNewScale(scaleName);
    const newInterevals = offset(majorIntervals, scaleOffsets[scaleName]);
    setIntervals(newInterevals);
  }

  const buildScale = (rootNote) =>  {
    const offsetChromaticScale = offset(notes, notes.indexOf(rootNote));
    let index = 0;
    let resultingScale = []
    intervals.forEach((interval) => {
      resultingScale.push(offsetChromaticScale[index]);
      index += interval;
    });
    return resultingScale;
  }
  return (
    <div>
      <select id="root-note" 
        value={selectedNote}
        onChange={e => selectNewNote(e.target.value)}
      >
        {notes.map((note, index) => 
          <option 
            value={note} 
            key={index}
            
            >{note}
          </option>
        )};
      </select>
      
      <select value={selectedScale} 
        onChange={e => {
          onScaleChange(e.target.value)
        }}>
        { scales.map((scale, index) =>  <option value={scale} key={index}>{scale}</option> ) }
      </select>
      
      <p>Selected scale: {selectedNote} {selectedScale}</p>
      <p>{buildScale(selectedNote)}</p>
    </div>
    )
};
