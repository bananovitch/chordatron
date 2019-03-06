import React, {useState} from "react";
import "./main.css";

export const App = () => {

  //The music theory
  const chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
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
  
  
  const [rootNote, selectNewRootNote] = useState("C");
  
  const [selectedMode, selectNewMode] = useState("Ionian");

  const [scale, setNewScale] = useState(["C","D","E","F","G","A","B"])

  const onModeChange = (modeName) => {
    selectNewMode(modeName);
    buildScale(rootNote, modeName);
  }

  const onRootNoteChange = (newRootNote) => {
    selectNewRootNote(newRootNote);
    buildScale(newRootNote, selectedMode);
  }
  
  const buildScale = (rootNote, mode) => {
    
    const intervals = offset(majorIntervals, scaleOffsets[mode]);
    const shiftedChromatic = offset(chromaticScale, chromaticScale.indexOf(rootNote));

    let newScale = [];
    let index = 0;

    intervals.forEach((currentInterval) => {
      newScale.push(shiftedChromatic[index]);
      index += currentInterval;
    });
    
    setNewScale(newScale)

  }

  return (
    <div>
      <select id="root-note" 
        value={rootNote}
        onChange={e => onRootNoteChange(e.target.value)}
      >
        {chromaticScale.map((note, index) => 
          <option 
            value={note} 
            key={index}
            
            >{note}
          </option>
        )};
      </select>
      
      <select value={selectedMode} 
        onChange={e => {
          onModeChange(e.target.value)
        }}>
        { scales.map((scale, index) =>  <option value={scale} key={index}>{scale}</option> ) }
      </select>
      
      <p>Selected scale: {rootNote} {selectedMode}</p>
      <p>{scale}</p>
    </div>
    )
};
