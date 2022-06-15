export const updateObjectInArray = (items: any[], itemId: any, objPropName: string | number, newObjProps: any) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, newObjProps}
        }
        return u;
    })
}