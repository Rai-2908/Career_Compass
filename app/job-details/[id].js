import { Text, View, SafeAreaView, ScrollView , 
    ActivityIndicator, RefreshControl, Dimensions} from "react-native";

import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components';
import { COLORS, icons, SIZES} from '../../constants';
import useFetch  from "../../hook/useFetch";


const tabs =["About", "Qualifications", "Responsibilities"];

const JobDetails =() => {
    const params = useSearchParams();
    const router = useRouter();

    const{ data, isloading, error, refetch} = useFetch('job-details', {
        job_id: params.id
    })

    const [refreshing, stRefreshing] = useState(false);

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh=()=> {}

    const displayTabContent =() => {
        switch (activeTab) {
            case "Qualifications":
                return <Specifics
                    title="Qualifications"
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
            case "About":
                return <JobAbout
                    info={data[0].job_description ?? "No data provided"}
                />
            
            case "Responsibilities":
                return <Specifics
                    title="Responsibilities"
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />

            default:
                break;
        }
    }

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
                    <Text>Loading...</Text>
                   ) : (
                    <View style={{ padding: SIZES.medium, paddingBottom : 100}}>
                        <Company
                             companyLogo={data[0].employer_logo}                           
                             jobTitle={data[0].job_title}                           
                             companyName={data[0].employer_name}                           
                             Location={data[0].job_country}                           
                        />

                        <JobTabs           
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {displayTabContent()}

                    </View>
                   )} 

                </ScrollView>

                <JobFooter url={data[0]?.job_google_link ?? 
                    'https://careers.google.com/jobs/results'}/>
            </>

        </SafeAreaView>
    )
}

export default JobDetails