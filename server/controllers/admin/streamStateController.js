import streamStore from "../../store/stream.store";

function streamStateController(req, res) {
    return res.json({
        message: 'some data',
        success: true,
        data: streamStore
    });
}

export default streamStateController;