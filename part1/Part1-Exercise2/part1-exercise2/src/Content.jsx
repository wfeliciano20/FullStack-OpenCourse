import Part from './Part';

const Content = ({part1, part2, part3, exercises1, exercises2, exercises3}) => {
  return (
    <>
      <Part partName={part1} partExercise={exercises1} />
      <Part partName={part2} partExercise={exercises2} />
      <Part partName={part3} partExercise={exercises3} />
    </>
  )
}

export default Content;