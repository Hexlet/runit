import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { actions } from '../slices/index.js';
import routes from '../routes.js';

const { runCode } = actions;

const useRunButton = () => {
  const dispatch = useDispatch();
  const { codeExecutionState, code } = useSelector(({ terminal, editor }) => ({
    codeExecutionState: terminal.codeExecutionState,
    code: editor.code,
  }));
  const onClick = useCallback(() => dispatch(runCode(code)), [dispatch, code]);
  const update = async (id, name) => {
    const response = await axios.put(routes.updateSnippetPath(id), {
      code,
      name,
    });
    dispatch(actions.updateSavedCode(code));
    return response;
  };

  const disabled = codeExecutionState === 'executing';

  return {
    onClick,
    update,
    disabled,
    code,
  };
};

export default useRunButton;
