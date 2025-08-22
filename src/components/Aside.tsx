import Calendar from "./Calendar";

export default function Aside() {
    // const { auth } = usePage<SharedData>().props;
    return (
      <div className='content-aside'>
      <h3>4 Daily Wins</h3>
     <Calendar/>
    </div>
    );
}