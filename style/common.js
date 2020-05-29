
/**
 *  公共样式属性
 *
 * */
import Colors from '../constants/Colors';

const layout = {
    // 这里的形参顺序遵循css中的 “上、右、下、左”
    margin(...arg) {
        let margin = {};
        switch (arg.length) {
            case 1:
                margin = {
                    marginTop: arg[0],
                    marginRight: arg[0],
                    marginBottom: arg[0],
                    marginLeft: arg[0],
                };
                break;
            case 2:
                margin = {
                    marginVertical: arg[0],
                    marginHorizontal: arg[1],
                };
                break;
            case 3:
                margin = {
                    marginTop: arg[0],
                    marginHorizontal: arg[1],
                    marginBottom: arg[2],
                };
                break;
            case 4:
                margin = {
                    marginTop: arg[0],
                    marginRight: arg[1],
                    marginBottom: arg[2],
                    marginLeft: arg[3],
                };
                break;
            default:
                break;
        }
        return margin;
    },
};

const color = {
    redFont: 'red',
    whiteFont: 'white',
    tabIconDefault: '#ccc',
    tabIconSelected: Colors.tintColor,
    tabBar: '#fefefe',
    errorBackground: 'red',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: Colors.tintColor,
    noticeText: '#fff',
}

const size = {

}

export {
    layout,
    color,
    size
}