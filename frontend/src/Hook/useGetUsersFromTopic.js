export default function useGetUsersFromTopic() {
    return function (topic) {
        return JSON.parse(topic.split('.'));

        // return JSON.parse(atob(topic));
    }
}