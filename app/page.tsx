'use client';
import Image from "next/image";
import { useState } from "react";
interface Candidate {
  id: number;
  name: string;
  votes: number;
}
let count: number = 3;
export default function Home() {

  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Balveer",
      votes: 0
    }, {
      id: 2,
      name: "Ahana",
      votes: 0
    }
  ]);
  const [candidateName, setCandidateName] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCandidates(allCandidate => {
      return [...allCandidate, {
        id: count,
        name: candidateName,
        votes: 0
      }]
    })

    count = count + 1;
  }

  function handleAdd(id: number) {
    setCandidates((allCandidates) => {

      return allCandidates.map(candidate => {
        if (id === candidate.id) {
          return { ...candidate, votes: candidate.votes + 1 }
        }
        return candidate;
      }).sort((a, b) => { return b.votes - a.votes })
    })

    console.log('function finished');
  }

  function handleSub(id: number) {
    setCandidates((allCandidates) => {

      return allCandidates.map(candidate => {
        if (id === candidate.id) {
          return { ...candidate, votes: candidate.votes - 1<0?0:candidate.votes-1 }
        }
        return candidate;
      }).sort((a, b) => { return b.votes - a.votes })
    })
  }

  return (
    <>
      <form >
        <h1>Candiates</h1>
        <ul>
          {candidates.map(candidate => {
            return (
              <li key={candidate.id}>
                <p>{candidate.name}</p>
                <span>{candidate.votes}</span>

                <button onClick={(e) => {
                  e.preventDefault();
                  handleAdd(candidate.id)
                }}>Add</button>
                <button onClick={(e) => {
                  e.preventDefault();
                  handleSub(candidate.id)
                }}>Subtract</button>
              </li>
            )
          })}
        </ul>
      </form>


      <h1>Add candidates</h1>
      <form onSubmit={handleSubmit}>
        <label>write the name of candidate</label>
        <input type='text' placeholder="Ram" onChange={(e)=> setCandidateName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
