import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Course } from '../src/models/Course.model.js';

dotenv.config();

const fixStudentPoints = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all courses
    const courses = await Course.find({});
    console.log(`📚 Found ${courses.length} courses`);

    let totalStudentsFixed = 0;

    for (const course of courses) {
      console.log(`\n📖 Processing course: ${course.title}`);
      
      // Create a map of quiz ID to points
      const quizPointsMap = new Map();
      for (const chapter of course.chapters) {
        for (const quiz of chapter.quizzes) {
          const questionsCount = (quiz.questions || []).length;
          const points = questionsCount * 20;
          quizPointsMap.set(quiz._id.toString(), points);
        }
      }

      console.log(`   Found ${quizPointsMap.size} quizzes`);

      // Fix each student's progress
      let courseModified = false;
      for (const progress of course.progress) {
        // Recalculate points from completed quizzes
        let correctPoints = 0;
        const validQuizIds = [];

        for (const quizId of progress.completedQuizIds) {
          const quizPoints = quizPointsMap.get(quizId.toString());
          if (quizPoints !== undefined) {
            correctPoints += quizPoints;
            validQuizIds.push(quizId);
          } else {
            console.log(`   ⚠️  Quiz ${quizId} no longer exists, removing from progress`);
          }
        }

        // Update if points are wrong or quiz IDs need cleanup
        if (progress.points !== correctPoints || validQuizIds.length !== progress.completedQuizIds.length) {
          console.log(`   🔧 Fixing student ${progress.studentId}`);
          console.log(`      Old points: ${progress.points}`);
          console.log(`      Correct points: ${correctPoints}`);
          console.log(`      Completed quizzes: ${validQuizIds.length}`);

          progress.points = correctPoints;
          progress.completedQuizIds = validQuizIds;
          courseModified = true;
          totalStudentsFixed++;
        }
      }

      if (courseModified) {
        await course.save();
        console.log(`   ✅ Updated course progress`);
      }
    }

    console.log(`\n✅ Migration complete! Fixed ${totalStudentsFixed} student progress records.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixStudentPoints();
