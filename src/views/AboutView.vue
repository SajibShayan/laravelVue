<template>
<div>
    <h1>This is an about page</h1>

    <section v-if="inProgressAssignments.length">
        <h3>Section for In progress</h3>
        <ul>
            <li v-for="assignment in inProgressAssignments" :key="assignment.id">
                <label for="">

                    {{ assignment.name }}

                    <input type="checkbox" v-model="assignment.complete">

                </label>
            </li>
        </ul>
    </section>

    <section v-if="completedAssignments.length">
        <h3>Section for completed</h3>
        <ul>
            <li v-for="assignment in completedAssignments" :key="assignment.id">
                <label for="">

                    {{ assignment.name }}

                    <input type="checkbox" v-model="assignment.complete">

                </label>
            </li>
        </ul>
    </section>

    <app-button></app-button>

</div>
</template>

<script>
export default {

    name: 'AboutView',

    data() {

        return {

            assignments: [

                {
                    name: 'Finish Project',
                    complete: false,
                    id: 1
                },
                {
                    name: 'Read Chapter 4',
                    complete: false,
                    id: 2
                },
                {
                    name: 'Turn in Homework',
                    complete: false,
                    id: 3
                },

            ],

        }

    },
    components: {

        'app-button': {

            mounted() {

                alert('Hello');

            }

        },

    },

    computed: {
        inProgressAssignments() {
            return this.assignments.filter(assignment => !assignment.complete);
        },

        completedAssignments() {
            return this.assignments.filter(assignment => assignment.complete);
        }
    }

}
</script>

<style>
li{
    list-style-type: none;  
}
</style>
