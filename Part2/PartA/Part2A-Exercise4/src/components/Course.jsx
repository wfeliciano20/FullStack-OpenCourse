import Header from './Header';
import Content from './Content';
import TotalExercises from './TotalExercises';

const Course = ({courses}) => {
  return (
    <>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <TotalExercises parts={course.parts}/>
          </div>
        )})}
    </>
  )
}

export default Course