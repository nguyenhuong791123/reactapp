export const WINDOWN_WIDTH = 992;
export const PAGIN_PER = 20;
export const PAGIN_PER_LIST = 5;
export const LINK = 0;
export const NOT_LINK = 1;

export const HTML_TAG = {
    CSS_LINK: 'link'
    ,HEAD: 'head'
    ,SCRIPT: 'script'
    ,CHECKBOX: 'checkbox'
    ,RADIO: 'radio'
    ,SELECT: 'select'
    ,TEXT: 'text'
    ,OBJECT: 'object'
    ,IFRAME: 'iframe'
    ,BODY: 'body'
    ,DIV: 'div'
    ,SVG: 'svg'
    ,PATH: 'path'
    ,PASSWORD: 'password'
    ,SPAN: 'SPAN'
    ,BUTTON: 'BUTTON'
}

export const VARIANT_TYPES = {
    OUTLINE: 'outline-'
    ,PRIMARY: 'primary'
    ,SECONDARY: 'secondary'
    ,SUCCESS: 'success'
    ,WARNING: 'warning'
    ,DANGER: 'danger'
    ,INFO: 'info'
    ,LIGHT: 'light'
    ,DARK: 'dark'
    ,LINK: 'link'
}

export const ACTION = {
    SLASH: '/'
    ,LIST: 'list'
    ,VIEW: 'view'
    ,CREATE: 'create'
    ,EDIT: 'edit'
    ,DELETE: 'delete'
    ,UPLOAD: 'upload'
    ,DOWNLOAD: 'download'
};

export const MSG_TYPE = {
    ERROR: 'error'
    ,LOGIN: 'login'
};

export const PAGE = {
    USER: 'user'
    ,SETTING: 'setting'
    ,SYSTEM: 'system'
    ,MAIL: 'mail'
    ,CHAT: 'chat'
};

export const PAGIN = {
    PRE: 'pre'
    ,PREALL: 'pre_all'
    ,NEXT: 'next'
    ,NEXTALL: 'next_all'
};

export const DAILER = {
    REGISTER: 'register'
    ,CLEAR: 'clear'
    ,CLEARALL: 'clear_all'
    ,CONTRACT: 'contract'
    ,CODE: 'code'
    ,TRANFER: 'tranfer'
    ,HOLD: 'hold'
    ,CALL: 'call'
    ,SOUND: 'sound'
    ,VIDEO: 'video'
    ,FULLSREEN: 'fullsreen'
};

export const NUMBER = {
    BLANK: ''
    ,ZERO: '0'
    ,ONE: '1'
    ,TWO: '2'
    ,THREE: '3'
    ,FOUR: '4'
    ,FIVE: '5'
    ,SIX: '6'
    ,SEVEN: '7'
    ,EIGHT: '8'
    ,NINE: '9'
    ,ASTERISK: '*'
    ,SHARP: '#'
};

export const THEME = {
    PATH: './dist/'
    ,FILE: '/bootstrap.min.css'
    ,getTheme: (theme) => {
        return THEME.PATH + theme + THEME.FILE;
    }
}