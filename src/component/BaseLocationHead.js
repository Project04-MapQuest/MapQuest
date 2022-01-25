import "../App.css"

const BaseLocationHead = (props) => {
    const { handleFormSubmit, userInput, setUserInput } = props


    const handleInput = (e) => {
        setUserInput(e.target.value);

    }
    return (
        <div className="App">
            <header>
                <div>
                    <h3>Shopper Mapper</h3>
                </div>
                <form action="#" onSubmit={handleFormSubmit}>
                    <input type="input" value={userInput} onChange={handleInput} />
                    <button> Search</button>
                </form>
            </header>
        </div>
    )
}
export default BaseLocationHead;