import axios from 'axios';
import {gameDetailsURL, gameScreenshotURL} from '../api';

//export gamedetails
export const loadDetail = (id) => async (dispatch) => {

    dispatch({
        type: "LOADING_DETAIL",
    });

    try {
        // The two requests don't depend on each other, so run them at the same time
        const [detailData, screenShotData] = await Promise.all([
            axios.get(gameDetailsURL(id)),
            axios.get(gameScreenshotURL(id)),
        ]);

        dispatch({
            type: "GET_DETAIL",
            payload: {
                game: detailData.data,
                screen: screenShotData.data,
            },
        });
    } catch (error) {
        dispatch({ type: "DETAIL_ERROR" });
    }
};
