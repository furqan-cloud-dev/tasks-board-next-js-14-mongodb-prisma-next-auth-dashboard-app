import React from 'react'
import { addTask } from '@/lib/actions';

export default function AddTaskPage() {
    return (
        <div className={styles.container}>
            <form action={addTask} className={styles.form}>
                <input type="text" placeholder="title" name="title" required />
                <select name="cat" id="cat">
                    <option value="general">Choose a Category</option>
                    <option value="skincare">Skin Care</option>
                    <option value="hair">Hair</option>
                    <option value="facetreatment">Face Treatment</option>
                    <option value="makeup">MakeUp</option>
                </select>
                <input type="number" placeholder="price" name="price" required />
                <input type="number" placeholder="stock" name="stock" required />
                <input type="text" placeholder="color" name="color" />
                <input type="text" placeholder="size" name="size" />
                <textarea
                    required
                    name="desc"
                    id="desc"
                    rows="16"
                    placeholder="Description"
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
