import ColList from "../components/ColList";
import useCourse from "./hooks/useCourse";

export default function CoursePage() {
    const { countryList, stateList, cityList, handleStateList, handleCityList, setCountryId, setStateId, handleCreateLocation, handleUpdateLocation, handleDeleteLocation } = useCourse();

    return (
        <>
            <div className="shadow-md flex ">
                <ColList
                    title={"Category"}
                    col_type={"start"}
                    countryList={countryList}
                    onListClick={handleStateList}
                    selected_id={setCountryId}
                    create_fn={handleCreateLocation}
                    handleUpdateLocation={handleUpdateLocation}
                    handleDeleteLocation={handleDeleteLocation}
                    isAction={stateList.length === 0}
                    colBase="lg:!max-w-[50%] lg:!w-[50%]"
                />
                <ColList
                    colBase="lg:!max-w-[50%] lg:!w-[50%]"
                    title={"SubCategory"}
                    col_type={"end"}
                    countryList={stateList}
                    onListClick={handleCityList}
                    selected_id={setStateId}
                    create_fn={handleCreateLocation}
                    handleUpdateLocation={handleUpdateLocation}
                    handleDeleteLocation={handleDeleteLocation}
                    isAction={cityList.length === 0}
                />
                {/* <ColList
                    title={"SubSubCategory"}
                    col_type={"end"}
                    countryList={cityList}
                    create_fn={handleCreateLocation}
                    handleUpdateLocation={handleUpdateLocation}
                    handleDeleteLocation={handleDeleteLocation}
                    isAction={true}
                /> */}
            </div>
        </>
    )
}
