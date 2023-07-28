import { Text, View, SafeAreaView, ScrollView , 
    ActivityIndicator, RefreshControl, Dimensions} from "react-native";

import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components';
import { COLORS, icons, SIZES} from '../../constants';
import useFetch  from "../../hook/useFetch";


const JobDetails =() => {
    const params = useSearchParams();
    const router = useRouter();

    const{ data, isloading, error, refetch} = useFetch('job-details', {
        job_id: params.id
    })

    const [refreshing, stRefreshing] = useState(false);

    const onRefresh=()=> {}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>

            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl = {icons.left}
                            dimensions ="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl = {icons.share}
                            dimensions ="60%"
                        />
                    ),
                    headerTitle: ''
                }}
            />

            <>
                <ScrollView showsVerticalScrollIndicator ={false} 
                RefreshControl={<RefreshControl refreshing={refreshing} 
                onRefresh={onRefresh}/>}>

                   {isloading ? (
                     <ActivityIndicator size= "large" color={COLORS.primary}/>
                   ) : error? (
                    <Text>Something Went Wrong</Text>
                   ) : data.length==0 ?(
                    <Text>No Dat</Text>
                   ) : (
                    <View style={{ padding: SIZES.medium, paddingBottom : 100}}>
                        <Company
                             companyLogo={data[0].employer_logo}                           
                             jobTitle={data[0].job_title}                           
                             companyName={data[0].employer_name}                           
                             Location={data[0].job_country}                           
                        />

                        <JobTabs
                        

                        
                        />

                    </View>
                   )} 

                </ScrollView>
            </>

        </SafeAreaView>
    )
}

export default JobDetails