import Homepage from "./Homepage";
import Navbar from "./Navbar";

const MainPage = () => {
    return ( 
        <div className="MainPage">
            <Navbar displayMenubar = {false} displayLogin={true}/>
            <Homepage/>
        </div>
     );
}
 
export default MainPage;