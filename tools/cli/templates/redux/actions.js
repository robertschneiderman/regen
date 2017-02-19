export const REQUEST_#{TEMPLATE}S = 'REQUEST_#{TEMPLATE}S';
export const REQUEST_#{TEMPLATE} = 'REQUEST_#{TEMPLATE}';
export const CREATE_#{TEMPLATE} = 'CREATE_#{TEMPLATE}';
export const UPDATE_#{TEMPLATE} = 'UPDATE_#{TEMPLATE}';
export const DESTROY_#{TEMPLATE} = 'DESTROY_#{TEMPLATE}';
export const RECEIVE_#{TEMPLATE}S = 'RECEIVE_#{TEMPLATE}S';
export const RECEIVE_#{TEMPLATE} = 'RECEIVE_#{TEMPLATE}';
export const REMOVE_#{TEMPLATE} = 'REMOVE_#{TEMPLATE}S';
export const #{TEMPLATE}_ERROR = '#{TEMPLATE}_ERROR';


export const request#{Template}s = () => ({
    type: REQUEST_#{TEMPLATE}S,
});

export const request#{Template} = id => ({
    type: REQUEST_#{TEMPLATE},
    id
});

export const receive#{Template}s = #{template}s => ({
    type: RECEIVE_#{TEMPLATE}S,
    #{template}s
});

export const receive#{Template} = #{template} => ({
    type: RECEIVE_#{TEMPLATE},
    #{template}
});

export const remove#{Template} = #{template} => ({
    type: REMOVE_#{TEMPLATE},
    #{template}
});

export const create#{Template} = #{template} => ({
    type: CREATE_#{TEMPLATE},
    #{template}
});

export const update#{Template} = #{template} => ({
    type: UPDATE_#{TEMPLATE},
    #{template}
});

export const destroy#{Template} = #{template} => ({
    type: DESTROY_#{TEMPLATE},
    #{template}
});

export const #{template}Error = error => ({
    type: #{TEMPLATE}_ERROR,
    error
});
