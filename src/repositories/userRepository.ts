import db from '../database';
import { User } from '../interfaces/userInterface'  

export class userRepository {  

    public getAllUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', (err: Error | null, rows: User[]) => {
                if (err){
                reject(err);
                }
                else {
                    console.log('Consulta bem-sucedida, retornando usuários:', rows);
                    resolve(rows);
                }
            });
        });
    }

    public getUserById(id: number): Promise<User> {
    return new Promise((resolve, reject) =>  {
        db.all('SELECT * FROM users WHERE id = ?', [id], (err: Error | null, row: User) =>
            {
                if (err) {
                    reject(err);
                    
                }
                else {
                    resolve(row);
                }
            });
        });
}
public CreateUser(name: string, age: number, email: string): Promise<User> {
return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (name, age, email) VALUES (?,?,?)', [name, age, email], function (err: Error | null) {
        if (err){
            reject(err);
        }
        else {
            resolve({id: this.lastID, name, age, email});
        }
    }); // fim do db.run
});
}


public updateUser(id: number, newData: Partial<User>): Promise<User> {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET name = ?, age = ?, email = ? WHERE id = ?';

        db.all(sql, [newData.name, newData.age, newData.email, id], (err: Error | null) =>
        {
            if (err){
                reject(err);
            }
            else {
                db.all('SELECT * FROM users WHERE id = ?', [id], (err: Error | null, row: User) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
            });
        }
    });
    });
}

public deleteUser(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM users WHERE id = ?', [id], (err: Error | null) => {
            if (err){
                reject(err);
            } else {
                const existingUser = db.get('SELECT * FROM users WHERE id = ?', [id]);
                console.log(existingUser);
                if (!existingUser) {
                    reject(new Error("User not found"))           
                    
                } else {
                    resolve("usuário deletado com sucesso");
                }
            }
        });
    });
}








} // fim da classe