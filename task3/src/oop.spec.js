const assert = require('assert');
const core = require('./oop');
const {Point3D} = require("./oop");

describe('ООП', () => {
    describe('#Point', () => {
        it('Точка создается с двумя параметрами, которые становятся x и y', () => {
            const point = new core.Point(1, 2);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 2);
        });

        it('Точка создается без параметров, x и y принимают нули как значение по умолчанию', () => {
            const point = new core.Point();

            assert.strictEqual(point.x, 0);
            assert.strictEqual(point.y, 0);
        });

        it('Точка создается с одним параметром, x принимает значение, y принимают нуль как значение по умолчанию', () => {
            const point = new core.Point(1);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 0);
        });

        it('Проверка метода toCenter()', () => {
            const point = new core.Point(0, 1);
            assert.strictEqual(point.toCenter(), 1);

            const point1 = new core.Point(2);
            assert.strictEqual(point1.toCenter(), 2);

            const point2 = new core.Point(2,2);
            assert.strictEqual(point2.toCenter(), 8**(0.5));
        });
    });

    describe('#Point3D', () => {
        it('Точка создается с двумя параметрами, которые становятся x и y, z принимает нуль как значение по умолчанию', () => {
            const point = new core.Point3D(1, 2);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 2);
            assert.strictEqual(point.z, 0);
        });

        it('Точка создается с тремя параметрами, которые становятся x, y, z', () => {
            const point = new core.Point3D(1, 2.5, -3);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 2.5);
            assert.strictEqual(point.z, -3);
        });

        it('Point3D имеет статический метод vectorLength', () => {
            const pointA = new core.Point3D(1, 2, -3);
            const pointB = new core.Point3D(1, -1, 1);

            assert.strictEqual(typeof Point3D.vectorLength, 'function');

            const length = Point3D.vectorLength(pointA, pointB);

            assert.strictEqual(length, 5);
        });
    });

    describe('#Queue', () => {
        it('Может создаться из массива', () => {
            const queue = new core.Queue([1,2,3,5]);
            assert.deepEqual(queue.array, [1,2,3,5]);
        });
        it('Может создаться без параметров', () => {
            const queue = new core.Queue();
            assert.deepEqual(queue.array, []);
        });

        it('Проверка массивом', () => {
            const queue = new core.Queue([1,2]);
            queue.push_back(3);
            assert.deepEqual(queue.array, [1,2,3]);
            assert.deepEqual(queue.pop_left(), 1);
        });

        it('Проверка на пограничные случаи', () => {
            const queue = new core.Queue([]);
            queue.push_back(2)
            assert.deepEqual(queue.array, [2]);
            assert.deepEqual(queue.pop_left(), 2);
            queue.pop_left()
            assert.deepEqual(queue.array, []);
            queue.push_back(1)
            assert.deepEqual(queue.array, [1]);
        });
    });
});