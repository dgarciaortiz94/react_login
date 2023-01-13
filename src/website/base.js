import Register from "../register/register";
import Menu from "./menu/menu";

function Base() {
    return (
        <div>
            <header class='d-flex justify-content-between align-items-center'>
                <div>LOGO</div>
                <div>
                    <Menu />
                </div>
            </header>

            <section>
                <Register />
            </section>

            <footer>
                <div>Este será mi footer</div>
            </footer>
        </div>
    );
}

export default Base;