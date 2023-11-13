/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Со звездочкой: реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
    constructor(a = 0, b = 0) {
        this.x= a
        this.y= b
    }

    toCenter() {
        return (this.x**2 + this.y**2)**(0.5)
    }
}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
    constructor(a, b, c = 0) {
        super(a,b)
        this.z = c
    }
    
    static vectorLength(a, b) {
        return ((a.x - b.x)**2 + (a.y - b.y)**2 + (a.z - b.z)**2)**(0.5)
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Со звездочкой: написать тесты методы класса (oop.spec.js)
 */
class Queue {
    constructor(arr = []) {
        this.array = Array.from(arr)
    }

    push_back(e) {
        this.array.push(e);
    }

    pop_left() {
        if (this.array.length > 0) {
            let e = this.array[0];
            this.array = this.array.slice(1, this.array.length)
            return e;
        }
    }
}

module.exports = {
    Point,
    Point3D,
    Queue,
};
