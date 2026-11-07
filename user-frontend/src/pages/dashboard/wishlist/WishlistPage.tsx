import WishlistThemeProvider from "./hook/WishlistThemeProvider";
import MainPage from "./MainPage";


export default function WishlistPage() {

    return (
        <>
            <WishlistThemeProvider>
                <MainPage />
            </WishlistThemeProvider>
        </>
    )
}
