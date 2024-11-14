import { useState } from "react";

type VoidFunc = () => void;

interface Part {
  name: string;
  exercises: number;
}

interface Course {
  name: string;
  parts: Part[];
}

const Header = ({ name }: { name: string }) => {
  return (
    <h1>{name}</h1>
  )
};
const Part = ({ part }: { part: Part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  );
};

const Content = ({ parts }: Pick<Course, "parts">) => {
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  )
};

const Total = ({ parts }: Pick<Course, "parts">) => {
  return (
    <p>
      Number of exercises {parts[0].exercises + parts[1].exercises
        + parts[2].exercises}
    </p>

  )
};

const Counter = ({ counter }: { counter: number }) => {
  return (counter === 0) ? (<div>Nothing to see here.</div>) : (
    <div>Counter: {counter}</div>
  )
};

const Button = ({ onClick, text }: { onClick: VoidFunc, text: string }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
}

const CounterControls = (
  { incrementCounter, decrementCounter, resetCounter }: {
    incrementCounter: VoidFunc,
    decrementCounter: VoidFunc,
    resetCounter: VoidFunc
  }) => {
  return (
    <>
      <Button onClick={incrementCounter} text="plus" />
      <Button onClick={decrementCounter} text="minus" />
      <Button onClick={resetCounter} text="reset" />
    </>
  );
}

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value:", counter);

  const incrementCounter = () => {
    console.log("increasing, value before:", counter);
    setCounter(counter + 1);
  }

  const resetCounter = () => {
    console.log("reset, value before:", counter);
    setCounter(0);
  }

  const decrementCounter = () => {
    console.log("decreasing, value before:", counter);
    setCounter(counter - 1);
  }

  const course: Course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <Counter counter={counter} />
      <CounterControls
        incrementCounter={incrementCounter}
        decrementCounter={decrementCounter}
        resetCounter={resetCounter} />
    </div>
  )
}

export default App