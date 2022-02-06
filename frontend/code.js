const app = new function () {
    this.tbody = document.getElementById('tbody');
    this.id = document.getElementById('id');
    this.nombres = document.getElementById('nombres');
    this.direccion = document.getElementById('direccion');
    const url = 'http://localhost:9000/api/';

    this.listado = () => {
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                this.tbody.innerHTML = '';
                data.forEach(element => {
                    this.tbody.innerHTML += `
                        <tr>
                            <td>${element.nombres}</td>
                            <td>${element.direccion}</td>
                            <td>
                                <button class="btn btn-danger" onclick="app.eliminar(${element.id})">Eliminar</button>
                                <button class="btn btn-warning" onclick="app.editar(${element.id})">Editar</button>
                            </td>
                        </tr>
                    `;
                });
            })
            .catch(err => console.log(err));
    }
    this.guardar = () => {
        const info = {
            nombres: this.nombres.value,
            direccion: this.direccion.value,
        };
        if (this.id.value === '') {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.message);
                    this.listado();
                    this.limpiar();
                })
                .catch(err => console.log(err));
        } else {
            fetch(url + this.id.value, {
                method: 'PUT',
                body: JSON.stringify(info),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.message);
                    this.listado();
                    this.limpiar();
                })
                .catch(err => console.log(err));
        }
    }
    this.limpiar = () => {
        this.id.value = '';
        this.nombres.value = '';
        this.direccion.value = '';
        this.nombres.focus();
    }
    this.editar = (id) => {
        fetch(url + id, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                this.id.value = data.id;
                this.nombres.value = data.nombres;
                this.direccion.value = data.direccion;
                this.nombres.focus();
            })
            .catch(err => console.log(err));
    }
    this.eliminar = (id) => {
        if (confirm('¿Estas seguro de eliminar el registro?')) {
            fetch(url + id, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.message);
                    this.listado();
                })
                .catch(err => console.log(err));
        }
    }
}
app.listado();