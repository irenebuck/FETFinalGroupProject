class Team{
    constructor(mgrName){
    this.mgrName= mgrName
    this.employee = []
    }
    addTeammate(firstName, lastName, email){
        this.employee.push(new Teammate(firstName,lastName, email))
    }
}

class Teammate{
    constructor(firstName, lastName, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

class TeamService{
    static url ="https://reqres.in/api/users?page=2"; // creating the static variable. Access to API
        
    static getAllTeams(){
        return $.get(this.url); // creating function to send request to Api
    }
        
    static getTeam(){
        return $.get(this.url + `/${id}`)
    }
        
    static createTeam(team){
        return $.post(this.url, team);
    }
        
    static update(team){
        return $.ajax({
            url:this.url + `/${team._id}`,
            dataType: 'json',
            data: JSON.Stringify(team),
            contentType: 'application/json',
            type: 'PUT'
        })
    }
    
    static deleteTeam(id){
        return $.ajax({
            url: this.url +`/${id}`,
            type: 'DELETE'
        })
    }    
}

class DOMManger{
        static teams;

        static getAllTeams(){
            TeamService.getAllTeams()
            .then(teams => this.render);
        }

        static createTeam(mgrName){
            TeamService.createTeam(new Team(mgrName))
            .then(() => {
                return TeamService.getAllTeams();
            })
            .then((teams) => this.render(teams));
        }

        static deleteTeam(id){
            TeamService.deleteTeam(id)
            .then(() => {
                return TeamService.getAllTeams();
            })
            .then((teams) => this.render(teams));
        }

        static addCar(id) {
            for(let team of this.teams) {
                if(team._id == id) {
                    team.mgrName.push(new Teammate($('#${lot._id}-car-firstName').val(), $('#${lot._id}-car-lastName').val()));
                    TeamService.update(team)
                    .then(() => {
                        return TeamService.getAllTeams();
                    })
                    .then((team) => this.render());
                }
            }
        }

        static deleteCar(teamId,teammateId) {
            for(let team of this.teams) {
                if(team._id == teamId) {
                    for (let teammate of teammate.teams) {
                        if(teammate._id == teammateId) {
                            team.teammate.splice(team.teammate.indexOf(car),1);
                            TeamService.update(lot)
                            .then((team)=> this.render(teams))
                        }
                    }
                }
            }
        }
        static render(teams){
            this.teams = teams;
            $('#app').empty();
            for(let team of teams){
                $('#app').prepend(
                    `<div id="${team._id}" class="card">
                        <div class="card-header">
                        <h2>${team.name}</h2>
                        <button class="btn btn-secondary" onclick="DOMManger.deleteLot('${team._id}')">Delete</button>
                        </div>
                       <di v class="card-body">
                            <div class="card">
                                <div class="row">
                                   <div class="col-sm">
                                     <input type="text" id="${team._id}-car-firstName" class="form-control" placeholder="Car Model">
                            </div>
                                   <div class="col-sm">
                                   <input type="text" id="${team._id}-car-lastName" class="form-control" placeholder="Car lastName">
                            </div>
                        </div>
                          <button id="${team._id}-new-car" onclick="DOMManger.addCar('${team._id}')" class="btn btn-primary form-control">Add</button>
                         </div>
                        </div><br>`
                );
                for(let teammate of team.teammates){
                    $(`#${team._id}`).find('.card-body').append(
                        `<p>
                        <span id="firstName-${team._id}"><strong>Model:</strong> ${team.firstName}</span>
                        <span id="lastName-${team._id}"><strong>lastName:</strong> ${team.lastName}</span>
                        <span id="license-${team._id}"><strong>email:</strong> ${team.license}</span>
                        <button class="btn btn-primary" onclick="DOMManger.deleteCar('${team._id} ', '${team._id}')">Delete Team</button>
                        `
                    )
                }
            }
     }
    }
    $("#mgrBtn").click(()=>{
        DOMManger.createTeam($('#new-team-name').val());
        $('#new-team-name').val('');
    });
    DOMManger.getAllTeams();